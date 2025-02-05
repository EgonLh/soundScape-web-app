import {albumAPISlice} from "@/lib/features/albums/albumAPISlice";

export interface AuthRequest{
    username:string;
    password:string;
}

export interface AuthResponse{
    token:string;
}
export interface UserInfoResponse {
    _id: string;
    name: {
        firstName: string;
        lastName: string;
        _id: string;
    };
    profileUrl: string;
    username: string;
    contact: {
        email: string;
        phoneNo: string;
        _id: string;
    };
    password: string;
    metadata: {
        createdAt: string;
        updatedAt: string;
        _id: string;
    };
    billInfo: string;
    role: 'admin' | 'user' | 'moderator';  // You can expand roles if needed
    __v: number;
}

export const authApi = albumAPISlice.injectEndpoints({
    endpoints:(build)=>({
        login:build.mutation<AuthResponse,AuthRequest>({
            query:(authRequest:AuthRequest)=>({
                url:`/users/login`,
                method:'POST',
                body:authRequest
            }),
        //     invalid tags and other laters
        }),
        getUserInfo: build.query<UserInfoResponse, void>({
            query: (usrName) => ({
                url: `/users/${usrName}`,  // Assuming this endpoint returns user info
                method: 'GET'
            }),
            providesTags: ['User']  // Tag to manage caching
        }),
    }),
    overrideExisting:true
});

export const {useLoginMutation,useGetUserInfoQuery} = authApi