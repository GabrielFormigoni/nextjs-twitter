import React, { useState, useCallback } from 'react'
import axios from 'axios'
import { signIn } from "next-auth/react"


import useLoginModal from '@/hooks/useLoginModal'
import Input from '../Input'
import Modal from '../Modal'
import useRegisterModal from '@/hooks/useRegisterModal'

const LoginModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            await signIn('credentials', {
                email,
                password
            })

            loginModal.onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
      },[LoginModal, email, password])
    
      const onToggle = useCallback(() => {
        try {
            if(isLoading) return ;



            loginModal.onClose()
            registerModal.onOpen()
        } catch (error) {
            console.log(error)
        }
      }, [isLoading, registerModal, loginModal])

      const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input 
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input 
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                value={password}
                disabled={isLoading}
            />
        </div>
      )

      const footerContent = (
        <div className='mt-4 text-neutral-400 text-center'>
            <p>Don't have an account yet?
                <span onClick={onToggle} className='text-white cursor-pointer hover:underline'> Register</span>
            </p>
        </div>
      )
  return (
    <Modal
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        title='Login'
        actionLabel='Sign in'
        body={bodyContent}
        footer={footerContent}
        disabled={isLoading}
    />
  )
}

export default LoginModal