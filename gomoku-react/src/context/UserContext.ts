/**
 * @author Krisna Gusti (kgusti@myune.edu.au)
 */

import { createContext } from 'react'

import { User } from '../types'

/**
 * Specifies the types of data and functions that will be available to the components consuming this context.
 */
type UserContextType = {
  user: User | undefined;
  login: (username: string, password: string) => Promise<boolean | string>;
  register: (username: string, password: string) => Promise<boolean | string>;
  logout: () => void;
}

/**
 * Creates the UserContext object with the initial value set to an empty object of the specified UserContextType.
 */
const UserContext = createContext<UserContextType>({} as UserContextType)

export default UserContext
