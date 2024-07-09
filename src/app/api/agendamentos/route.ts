import prisma from '../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const agendamentos = await prisma.agendamento.findMany()
    console.log(agendamentos)
    return NextResponse.json(agendamentos)
  } catch (error) {
    return NextResponse.json(
      {
        message: 'error',
        error,
      },
      { status: 500 },
    )
  }
}
