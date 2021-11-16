import React, {FC, useEffect} from 'react';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import {useAppSelector, useAppDispatch} from '../../app/hooks';
import { selectFiles, getFiles, setFile} from './postsSlice';
import {FetchedPost} from '../../models/post';

import './Posts.css';

const Post:FC<{ index: number}> = ({index}) => {
    const files: FetchedPost[] = useAppSelector(selectFiles);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (files.length === 0) {
            dispatch(getFiles('news/news1.md?cur_dir=""'));
        }
        if (files.length === 1) {
            dispatch(getFiles('files/it_structure.md?cur_dir=""'));
        }
        dispatch(setFile({name: '', content: ''}));
    }, [files.length, dispatch])

    return (
        <div>
            {index <= files.length -1 &&
              <div className="post-container">
                < Markdown children={files[index].content}
                           remarkPlugins={[remarkGfm]}
                           rehypePlugins={[rehypeRaw]}
                           className="prose"
                />
              </div>
            }
        </div>
    );
}

export default Post;