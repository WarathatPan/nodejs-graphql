import {
  getTeamService,
  createTeamService,
} from './services'

const query = `
  # แสดงทีมฟุตบอล
  teams(input: SearchTeamInput): TeamsPayload
`

const mutation = `
  # สร้างทีมฟุตบอล
  createTeam(input: CreateTeamInput!): TeamsPayload
`

const typeDefinitions = `
  # input ของการ search Team
  input SearchTeamInput {
    keyword: String
    per_page: Int
    current_page: Int
  }
  # input ของการสร้างทีมฟุตบอล
  input CreateTeamInput {
    team: TeamData
  }
  # input ข้อมูลของการสร้างทีมฟุตบอล
  input TeamData {
    fullname: String! # "!" คือ require field นี้
    shortname: String!
    nickname: String
    founded: String
    stadium: String
    capacity: Int
    owner: String
    manager: String
  }

  # แสดงผลลัพท์ของ Team
  type TeamsPayload {
    meta: Meta
    data: [Team] # "[]" คือ list ของทีม
    errors: [Error]
  }
  # แสดงข้อมูลของ Team
  type Team {
    _id: ID
    fullname: String
    shortname: String
    nickname: String
    founded: String
    stadium: String
    capacity: Int
    owner: String
    manager: String
    created_at: String
    updated_at: String
  }
  # แสดงข้อมูลจิปาถะ(มั้งนะ >3<)
  type Meta {
    status: Int
    message: String
    total: Int
    per_page: Int
    current_page: Int
    last_page: Int
  }
  # แสดง Errors
  type Error {
    code: Int
    message: String
  }
`

const resolvers = {
  Query: {
    teams(root, args) {
      return new Promise((resolve, reject) => {
        getTeamService(args, (data) => {
          resolve(data)
        })
      })
    },
  },
  Mutation: {
    createTeam(root, args) {
      return new Promise((resolve, reject) => {
        createTeamService(args, (data) => {
          resolve(data)
        })
      })
    },
  },
}

export {
  query,
  typeDefinitions,
  mutation,
  resolvers,
}
