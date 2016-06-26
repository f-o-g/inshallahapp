import Parse from 'parse/node'
import settings from '../settings'
import firebaseJSON from './firebase.json'

const skills = [
  "Accommodation",
  "Arabic Lessons",
  "Asylum System",
  "Border Updates",
  "Child Support",
  "Cooking",
  "Counselling",
  "Education",
  "English Lessons",
  "French Lessons",
  "Friendship",
  "German Lessons",
  "Interview Advice",
  "Jobs",
  "Legal Help",
  "Medical Care",
  "Mentoring",
  "Phone Credit",
  "Psychologist",
  "Translation"
].map( m => ({ name: m}))

Parse.initialize(settings.parseServerApplicationId);
Parse.serverURL = `http://${settings.serverHost}:${settings.serverPort}/parse`;

const BLACKLISTED_KEYS = new Set(['objectId', 'createdAt', 'updatedAt']);
const ID_MAP = new Map()

const convertPointer = (pointer) => {
  if (pointer.__type === 'Pointer') {
    return {...pointer, objectId: ID_MAP.get(pointer.objectId) || pointer.objectId};
  }
  return pointer;
}

async function importObject(ClassType, attributes) {
  let obj = new ClassType();
  for (let key in attributes) {
    if (BLACKLISTED_KEYS.has(key)) {
      continue;
    }
    let value = attributes[key];
    if (Array.isArray(value)) {
      value = value.map(convertPointer);
    }
    obj.set(key, value);
  }
  obj = await obj.save();
  ID_MAP.set(attributes.objectId, obj.id);
  return obj;
}

async function createClass(className, data) {
  const ClassType = Parse.Object.extend(className)
  console.log('Cleaning old', className, 'data');
  await new Parse.Query(ClassType)
    .each(record => record.destroy());
  console.log('Converting', className);
  return Promise.all(data.map(attrs => importObject(ClassType, attrs)))
}

const usersData = () => {
  const { users } = firebaseJSON
  const newUsers = []
  Object.keys(users).forEach( user => {
    let newUser = {}
    const mappingUserFields = {
      "first_name": "firstName",
      "hasSkills": "skills",
      "last_name": "lastName",
      "locationCity": "city",
      "locationCountry": "country",
      "phoneNumber": "number",
      "profileComplete": "profileComplete",
      "skillsNeeded": "needs"
    }
    const oldKeys = Object.keys(mappingUserFields)
    const userFields = Object.keys(users[user])
    userFields.forEach( field => {
      if(oldKeys.indexOf(field) > -1) {
        newUser[mappingUserFields[field]] = users[user][field]
      }
    })
    newUsers.push(newUser)
  })
  return newUsers
}

async function main() {
  await createClass('Skill', skills)
  await createClass('Need', skills)
  await createClass('Refugee', usersData())
  await createClass('Volunteer', usersData())
  return 'OK'
}

main()
  .then(console.dir, console.error)

