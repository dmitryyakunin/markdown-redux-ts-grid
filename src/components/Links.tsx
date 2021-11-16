import React, {FC} from "react"
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getFile, selectPostList, PostList} from "./posts/postsSlice";
import "./components.css"

const Links: FC<{ folderName: string, title?: string }> = ({folderName, title}) => {
    const postList: PostList[] = useAppSelector(selectPostList);
    const dispatch = useAppDispatch();

    let curPosts = postList.find(post => post.folderName === folderName)

    return (
        <div style={{fontSize: '16px', margin: '0.5em'}}>
            <div className="links-group">
                <div className="links-group_title">
                    {title}
                </div>

                {curPosts &&
                    curPosts.posts.map((post, i) => {
                        return (
                            <div key={i} className="links-group_content">
                                <div onClick={() => dispatch(getFile(folderName + '/' + post.name+'?cur_dir=home'))}>
                                    {post.content}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Links;