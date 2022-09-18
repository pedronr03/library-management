interface BookEntity {
  id: number
  title: string
  isbn: string
  totalPages: number
  rating: number
  publishedDate: Date
  photoId?: number
  authorId: number
}

export default BookEntity;