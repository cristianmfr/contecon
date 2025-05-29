import { gql } from '@apollo/client'

export const CREATE_SCHEDULE = gql`
  mutation CreateSchedule($data: CreateScheduleInput!) {
    createSchedule(data: $data)
  }
`
