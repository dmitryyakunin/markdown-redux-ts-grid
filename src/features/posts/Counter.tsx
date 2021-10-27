import React, {useState} from 'react';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {getAllFiles, getFile, selectItems, selectFile} from './counterSlice';
import {FetchedPost} from '../../models/post';
import styles from './Counter.module.css';


export function Counter() {
    const items: FetchedPost[] = useAppSelector(selectItems);
    const file: FetchedPost = useAppSelector(selectFile);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Test fetch"
                    onClick={() => dispatch(getFile('firstpost.md'))}
                >
                    fetch file
                </button>
                <button
                    className={styles.button}
                    aria-label="Test file"
                    onClick={() => dispatch(getAllFiles())}
                >
                    fetch all files
                </button>
            </div>
            <div>
                < Markdown children={file.content}
                           remarkPlugins={[remarkGfm]}
                           rehypePlugins={[rehypeRaw]}
                           className="prose"
                />
            </div>
            <div>
                {items.length > 0 &&
                    items.map((post, i) => {
                        return (
                            <div key={i} className="post-card">
                                <Markdown children={post.content}
                                          remarkPlugins={[remarkGfm]}
                                          rehypePlugins={[rehypeRaw]}
                                          className="prose"
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
