import React, {FC, useEffect, useState} from "react"
import {
    getBriefly,
    getDirectories,
    getDirTitles, getPages,
    selectConfig,
    selectTitles, setCurDir
} from "../components/posts/postsSlice";

import "./page.css";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {IRouterProps} from "../App";
import Posts from "../components/posts/Posts";
import Post from "../components/posts/Post";
import Links from "../components/Links";
import Navbar from "../components/Navbar";
import {getTitle} from "../lib/getTitle";

export interface CurrentPage{
    directory: string;
    linkName: string;
    title: string;
}

const Files: FC<IRouterProps> = (props: IRouterProps) => {
    const dispatch = useAppDispatch();
    let pages: any;
    const [currentPage, setCurrentPage] =
        useState<CurrentPage>({directory: '', linkName: '', title:''});

    const params = props.match.params;
    console.log(params);

    useEffect(() => {
        if (!params.page) {
            params.page = 'home';
            params.index = '0';
        }
        getPageDir(params.page);
    }, [params.page])

    async function getPageDir(param_dir:string) {
        pages = await dispatch(getPages());
        let page: string = pages.payload.content;
        let dir: string[] = page.split(';');
        let page_params: string[] = dir[parseInt(params.index)].split(':');
        let cur_dir: string[] = [param_dir];
        await dispatch(setCurDir(cur_dir[0]));
        await dispatch(getDirTitles(cur_dir[0]));
        await setCurrentPage({directory: page_params[0], linkName: page_params[1], title: page_params[2]});
    }

    return (
        <div  className="main" >
            <div className="header">
                <Navbar/>
            </div>

            <div className="aside">
                {(currentPage.title) &&
                  <div className="page-title" style={{marginLeft: '0px', marginBottom: '10px'}}>
                    <h2>{currentPage.title}</h2>
                  </div>
                }
            </div>

            <div className="article">
                {/*{(currentPage.title) &&
                  <div className="page-title">
                    <h2>{currentPage.title}</h2>
                  </div>
                }*/}
                <div style={{margin: '0.5em'}}>
                    <Post index={parseInt(params.index)} fileName={params.file}/>
                </div>
            </div>

            <div className="document">
                <Posts index={parseInt(params.index)}/>
            </div>

        </div>
    )
}

export default Files