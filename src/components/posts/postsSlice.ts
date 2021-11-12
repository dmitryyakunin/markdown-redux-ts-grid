import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import DataService from "../../services/Service";
import {FetchedPost} from "../../models/post";

export interface PostList {
    folderName: string;
    posts: FetchedPost[];
}

export interface CounterState {
    status: 'idle' | 'loading' | 'failed';
    items: FetchedPost[];
    files: FetchedPost[];
    file: FetchedPost;
    postList: PostList[];
    config: string[];
    titles: string[];
}

const initialState: CounterState = {
    status: 'idle',
    items: [],
    files: [],
    file: {name: '', content: ''},
    postList: [],
    config: [],
    titles: [],
};

export const getAllFiles = createAsyncThunk(
    "posts/allfiles",
    async () => {
        const res = await DataService.getAll();
        return res.data;
    }
);

export const getBriefly = createAsyncThunk(
    "posts/postList",
    async (folderName: string) => {
        const res = await DataService.getBriefly(folderName);
        return res.data;
    }
);

export const getFile = createAsyncThunk(
    "posts/getfile",
    async (fileName: string) => {
        const res = await DataService.getFile(fileName);
        return res.data;
    }
);

export const getDirectories = createAsyncThunk(
    "posts/getconfigfile",
    async () => {
        const res = await DataService.getDirectories();
        return res.data;
    }
);

export const getDirTitles = createAsyncThunk(
    "posts/getdirtitles",
    async () => {
        const res = await DataService.getFile('titles.md');
        return res.data;
    }
);

export const getFiles = createAsyncThunk(
    "posts/getfiles",
    async (fileName: string) => {
        const res = await DataService.getFile(fileName);
        return res.data;
    }
);

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setFile: (state, action: PayloadAction<FetchedPost>) => {
            state.file = {name: action.payload.name, content: action.payload.content}
        }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(getAllFiles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllFiles.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload.data;
            });
        builder
            .addCase(getFile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFile.fulfilled, (state, action) => {
                state.status = 'idle';
                state.file = action.payload;
            });
        builder
            .addCase(getDirTitles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDirTitles.fulfilled, (state, action) => {
                state.status = 'idle';
                state.titles = action.payload.content.split(',');
            });
        builder
            .addCase(getDirectories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDirectories.fulfilled, (state, action) => {
                state.status = 'idle';
                state.config = action.payload.data;
            });
        builder
            .addCase(getFiles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFiles.fulfilled, (state, action) => {
                state.status = 'idle';
                state.files.push(action.payload);
            });
        builder
            .addCase(getBriefly.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getBriefly.fulfilled, (state, action) => {
                state.status = 'idle';
                if (!state.postList.find(pathName => pathName.folderName === action.payload.path)) {
                    if (action.payload.data[0].content !== '')
                        state.postList.push({folderName: action.payload.path, posts: action.payload.data});
                }
            });
    },
});

//export const { increment, decrement, incrementByAmount } = postsSlice.actions;
export const {setFile} = postsSlice.actions
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.posts.value)`
//export const selectCount = (state: RootState) => state.counter.value;

export const selectItems = (state: RootState) => state.counter.items;
export const selectFile = (state: RootState) => state.counter.file;
export const selectFiles = (state: RootState) => state.counter.files;
export const selectPostList = (state: RootState) => state.counter.postList;
export const selectConfig = (state: RootState) => state.counter.config;
export const selectTitles = (state: RootState) => state.counter.titles;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default postsSlice.reducer;
