// Blog Data Types - Object-Oriented Design

export class Author {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: Author;
  date: Date;
  readingTime: number;

  constructor(
    id: string,
    title: string,
    content: string,
    author: Author,
    date: Date = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.date = date;
    this.excerpt = this.generateExcerpt(content);
    this.readingTime = this.calculateReadingTime(content);
  }

  private generateExcerpt(content: string, maxLength: number = 150): string {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  }

  private calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }
}

export interface PostFormData {
  title: string;
  authorName: string;
  content: string;
}
