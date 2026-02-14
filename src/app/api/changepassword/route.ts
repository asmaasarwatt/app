import { NextRequest, NextResponse } from 'next/server'
import { getAccessToken } from '@/schema/access-token'

export async function POST(req: NextRequest) {
 
  const token = await getAccessToken()
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { currentPassword, newPassword } = await req.json()

  try {
    const resp = await fetch(`${process.env.API}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token 
      },
      body: JSON.stringify({ currentPassword, newPassword })
    })

    const data = await resp.json()
    if (!resp.ok) return NextResponse.json({ message: data.message }, { status: 400 })

    return NextResponse.json({ message: 'Password changed successfully' })
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}