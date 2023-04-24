import React, { useState, useCallback } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast"
import { signIn } from "next-auth/react"

import useRegisterModal from '@/hooks/useRegisterModal'
import Input from '../Input'
import Modal from '../Modal'
import useLoginModal from '@/hooks/useLoginModal'

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async () => {
        try {
          setIsLoading(true);
          
          await axios.post('/api/register', {
            email,
            password,
            username,
            name,
          });
    
          setIsLoading(false)
    
          toast.success('Account created.');
    
          signIn('credentials', {
            email,
            password,
          });
    
          registerModal.onClose();
        } catch (error) {
          toast.error('Something went wrong');
        } finally {
          setIsLoading(false);
        }
      }, [email, password, registerModal, username, name]);
    
      const onToggle = useCallback(() => {
        try {
            if(isLoading) return ;

            registerModal.onClose()
            loginModal.onOpen()
        } catch (error) {
            console.log(error)
        }
      }, [registerModal, loginModal, isLoading])

      const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input 
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input 
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input 
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
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
        <div className='text-neutral-400 text-center mt-4'>
            <p>Already have an account?
                <span onClick={onToggle} className='text-white cursor-pointer hover:underline'> Sign in</span>
            </p>
        </div>
      )
  return (
    <Modal
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        title='Create an account'
        actionLabel='Register'
        body={bodyContent}
        footer={footerContent}
        disabled={isLoading}
    />
  )
}

export default RegisterModal