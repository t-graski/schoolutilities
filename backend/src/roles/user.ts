

export class User {
  id: number;
  isAdmin: boolean;
}

export class Article {
  id: number;
  isPublished: boolean;
  authorId: number;
}
