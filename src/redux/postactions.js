export const POST_LISTING="POST_LISTING"
export const POST_DETAIL="POST_DETAIL"

export const postListingSuccess=(postData)=>{
    return{
        type:POST_LISTING,
        payload:postData
    }
}

export const postDetailSuccess=(postData)=>{
    return{
        type:POST_DETAIL,
        payload:postData
    }
}