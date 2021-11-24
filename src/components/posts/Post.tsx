import React, {FC, useEffect} from 'react';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {selectFiles, setFile, getAllFiles, getFile} from './postsSlice';
import {FetchedPost} from '../../models/post';

import './Posts.css';

const Post:FC<{ index: number, fileName: string}> = ({index,fileName}) => {
    const files: FetchedPost[] = useAppSelector(selectFiles);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllFiles('pages'));
        dispatch(setFile({name: '', content: ''}));
        if (fileName !== '') {
            dispatch(getFile('files/'+fileName));
        }
    }, [files.length, dispatch])

    return (
        <div>
            {files[index] && index <= files.length - 1 &&
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