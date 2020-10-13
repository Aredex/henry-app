const { gql } = require("apollo-server-express");

const typeDefs = gql`
   type CheckPoint {
      id: Int
      name: String
   }

   type Cohorte {
      id: Int
      name: String
      number: Int
      startDate: String
      instructor: User
   }

   type Content {
      id: Int
      topicName: String
      durationTime: Int
   }

   enum GroupTypes {
      pp
      standup
      general
   }

   type Group {
      id: Int
      name: String
      type: GroupTypes
      instructor: User
      pms: [User]
      staff: [User]
      students: [User]
   }

   input GroupInput {
      name: String
      type: GroupTypes
      instructorId: Int
      pmId: [Int]
      staffId: [Int]
      studentId: [Int]
   }

   type Module {
      id: Int
      name: String
      description: String
   }

   #enum RoleTypes {
   #   instructor
   #   pm
   #   student
   #   staff
   #}
   
   type Role {
      id: Int
      name: String
   }

   type Score {
      id: Int
      score: Float
   }

   type User {
      id: Int
      givenName: String
      familyName: String
      nickName: String
      email: String
      googleId: String
      githubId: String
      photoUrl: String
      roles: [Role]
   }

   type MatesScore {
      id: Int
      name: String 
   }

   type MateReview {
      id: Int
      score: Int
      commentary: String
   }

   type Query {
      checkPoints(id: Int, name: String): [CheckPoint]
      cohortes(name: String): [Cohorte]
      contents(topicName: String): [Content]
      groups(id: Int, name: String): [Group]
      modules(id: Int): [Module]
      roles(id: Int): [Role]
      scores(id: Int): [Score]
      users(id: Int): [User]
      getUserRol(role: String): [User]

      matesScore(id: Int, name: String): [MatesScore]

      mateReview(id: Int, score: Int, commentary: String): [MateReview]
   }

   # Estos son los datos que acepta un usuario
   input UserInput {
      givenName: String
      familyName: String
      nickName: String
      email: String
      googleId: String
      githubId: String
      photoUrl: String
      password: String
      role: String
      roles: [String]
   }

   # Esto es tl tipo objeto que arroja cuando se elimina un registro
   type DeleteResolve {
      message: String!
   }

   type Error {
      message: String
      type: String
      code: Int
   }

   type ErrorMessage {
      name: String
      type: String
      error: Error
   }

   type Mutation {
      # Mutaciones para usuarios
      createUser(input: UserInput): User!
      updateUser(id: Int, input: UserInput): User!
      deleteUser(id: Int): DeleteResolve!
      inviteUser(email: String!, role: String!): User

      # Mutations Cohorte
      createCohorte(
         name: String
         number: Int
         instructor: Int
         startDate: String
      ): Cohorte!
      editCohorte(
         id: Int
         name: String
         number: Int
         startDate: String
         instructor: Int
      ): Cohorte!
      deleteCohorte(id: Int): DeleteResolve!

      # Mutaciones para los modulos
      createModule(name: String!): Module!
      updateModule(id: Int, name: String!, description: String!): Module!
      deleteModule(id: Int): DeleteResolve!

      # Mutaciones para los checkpoints
      createCheckPoint(name: String!): CheckPoint!
      updateCheckPoint(id: Int, name: String!): CheckPoint!
      deleteCheckPoint(id: Int): DeleteResolve!

      # Mutaciones para Contenidos
      createContenido(topicName: String!, durationTime: Int): Content!
      updateTopics(id: Int, topic: String!): Content!
      deleteTopics(id: Int): DeleteResolve!

      # Mutaciones para Roles
      createRole(name: String): Role!
      updateRole(id: Int, name: String): Role!
      deleteRole(id: Int, name: String): DeleteResolve!

      # Mutaciones para Scores
      createScore(score: Float): Score!
      updateScore(id: Int, score: Float): Score!
      deleteScore(id: Int): DeleteResolve!

      # Mutaciones pra Gtoups
      createGroup(input: GroupInput): Group!
      updateGroup(id: Int, name: String, type: GroupTypes): Group!
      deleteGroup(id: Int, name: String): DeleteResolve!
      removeUsersOfGroups(id: Int!, name: String, userId: [Int]!): Group!
      addUsersToGroups(id: Int, name: String, input: GroupInput): Group!

      # Mutaciones para MatesScore
      createMatesScore(name: String): Score!
      updateMatesScore(id: Int, name: String): Score!
      deleteMatesScore(id: Int, name: String): DeleteResolve!

      # Mutaciones para MatesReview
      createReview(score: Int, commentary: String): Score!
      updateReview(id: Int, score: Int,commentary: String): Score!
      deleteReview(id: Int, score: Int, commentary: String): DeleteResolve!
   }
`;

module.exports = typeDefs;
