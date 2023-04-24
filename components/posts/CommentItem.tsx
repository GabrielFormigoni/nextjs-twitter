import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react'
import Avatar from '../Avatar';

interface CommentItemProps {
    data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
    const router = useRouter()

    const goToUser = useCallback((e: any) => {
        e.stopPropagation()

        router.push(`/users/${data.user.id}`)
    }, [data.user.id, router])

    const createdAt = useMemo(() => {
        if(!data?.createdAt) {
            return null
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));

    }, [data?.createdAt, router])

    return (
    <div className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-500 transition'>
        <div className='flex items-center flex-row gap-3'>
            <Avatar userId={data.user.id} />
            <div>
                <div className='flex flex-row items-center gap-2'>
                    <p className='text-white font-semibold cursor-pointer hover:underline' onClick={goToUser}>
                        {data.user.name}
                    </p>
                    <span className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>
                        {data.user.username}
                    </span>
                    <span className='text-neutral-500 text-sm'>
                        {createdAt}
                    </span>
                </div>
                    <p className='text-white mt-1'>
                        {data.body}
                    </p>
            </div>
        </div>
    </div>
  )
}

export default CommentItem