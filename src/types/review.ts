export interface IReview {
  id: number;
  userName: string;
  estimation: number;
  date: string;
  dignities: string;
  disadvantages: string;
  comment: string;
}

export interface IReviewState {
  userName: string;
  estimation: number;
  dignities: string;
  disadvantages: string;
  comment: string;
}