import user from '../../../assets/user.png'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
// import logout from '../../_components/Navbar/navbar'
import Link from "next/link"
export function DropdownMenuBasic({logout}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Image src={user} alt='user' width={50}  height={50}  />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
         
          <DropdownMenuItem>
            <Link href={'/profile'}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="cursor-pointer" onClick={logout}>Logout</span>
          </DropdownMenuItem>

        </DropdownMenuGroup>
      
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
