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

export async function POST(req: Request) {
  console.log('POST passou aqui')
  try {
    const { cliente, data, servico } = await req.json()
    const agendamento = await prisma.agendamento.create({
      data: {
        cliente,
        data: new Date(data),
        servico,
      },
    })
    console.log('agendamento', agendamento)
    return Response.json({ agendamento })
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

export async function DELETE(req: Request) {
  console.log('DELETE passou aqui')
  try {
    const { id } = await req.json()
    const agendamento = await prisma.agendamento.delete({
      where: { id: Number(id) },
    })
    console.log('agendamento deletado', agendamento)
    return NextResponse.json({ agendamento })
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
