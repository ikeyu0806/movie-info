export interface Review {
  movie_id: number
  public_id: number
  comment: string
  score: number
  user_id: number | null
}
