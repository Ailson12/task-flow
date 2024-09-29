export interface Board {
  id: string
  name: string
}

export interface BoardService {
  findAll(): Promise<Board[]>
}
