export interface Book{
    id:string;
    bookName:string;
    rating:number;
    author:string;
    genre:string;
    imageUrl:string;
    is_Book_Availaible:boolean;
    description:string;
    lent_By_UserId:number;
    borrowed_By_UserId:number;
}