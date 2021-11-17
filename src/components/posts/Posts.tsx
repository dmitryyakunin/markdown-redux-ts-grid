import React, {FC} from 'react';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import {useAppSelector} from '../../app/hooks';
import {selectItems, selectFile} from './postsSlice';
import {FetchedPost} from '../../models/post';

import './Posts.css';
import {getMarkdownContent, getMarkdownHeader} from "../../lib/markdownUtils";

const Posts:FC<{ index: number}> = ({index}) => {
    const items: FetchedPost[] = useAppSelector(selectItems);
    const file: FetchedPost = useAppSelector(selectFile);

    return (
        <div>
            {file && file.content.length > 0 &&
              <div className="post-container">
                <div className="file-title"> {getMarkdownHeader(file.content).title} </div>
                <div className="file-date"> {getMarkdownHeader(file.content).date} </div>
                < Markdown children={'---' + getMarkdownContent(file.content) }
                           remarkPlugins={[remarkGfm]}
                           rehypePlugins={[rehypeRaw]}
                           className="prose"
                />
              </div>
            }
            {items.length > 0 &&
              <div className="post-container">
                  {items.map((post, i) => {
                      return (
                          <div key={i} className="post-card">
                              <Markdown children={getMarkdownContent(post.content)}
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        className="prose"
                              />
                          </div>
                      )
                  })
                  }
              </div>
            }
        </div>
    );
}

export default Posts;