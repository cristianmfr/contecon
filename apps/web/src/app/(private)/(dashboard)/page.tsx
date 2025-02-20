'use client'

import { GET_CURRENT_USER } from '@/shared/api/queries/get-current-user'
import { useQuery } from '@apollo/client'

export default function Dashboard() {
    const { data } = useQuery(GET_CURRENT_USER)

    return (
        <div>
            <span>{data?.getCurrentUser.name}</span>
        </div>
    )
}
