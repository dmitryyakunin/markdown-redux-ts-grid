import React, {FC, useEffect, useState} from "react"
import {
    getBriefly,
    getDirectories,
    getDirTitles, getPages,
    selectConfig, selectFiles,
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
import {FetchedPost} from "../models/post";

export interface CurrentPage{
    directory: string;
    linkName: string;
    title: string;
}

const Home: FC<IRouterProps> = (props: IRouterProps) => {
    const dispatch = useAppDispatch();
    let pages: any;
    const config: string[] = useAppSelector(selectConfig);
    const titles: string[] = useAppSelector(selectTitles);
    const files: FetchedPost[] = useAppSelector(selectFiles);

    const [currentPage, setCurrentPage] =
        useState<CurrentPage>({directory: '', linkName: '', title:''});

    const params = props.match.params;
    //console.log(params.page + params.index);

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
        await getCategorisFileList(cur_dir[0]);
        await dispatch(getDirTitles(cur_dir[0]));
        await setCurrentPage({directory: page_params[0], linkName: page_params[1], title: page_params[2]});
    }

    async function getCategorisFileList(cur_dir: string) {
        try {
            let directories = await dispatch(getDirectories(cur_dir));
            if (directories.type !== 'posts/getconfigfile/rejected') {
                for (let i = 0; i < directories.payload.data.length; i++) {
                    dispatch(getBriefly({
                        folderName: directories.payload.data[i], cur_dir:cur_dir
                    }));
                }
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div  className="main" >
            <div className="header">
                <Navbar/>
            </div>

            <div className="aside">
                {config.length > 0 &&
                  <div className="post-container">
                      {config.map((conf, i) => {
                              return (
                                  <div key={i} className="post-card">
                                      <Links folderName={conf}
                                             title={getTitle(titles, conf)}
                                      />
                                  </div>
                              )
                          })
                      }
                  </div>
                }
            </div>

            <div className="article">
                {(currentPage.title) &&
                  <div className="page-title">
                      {/*<h2>Новости <a href="https://irand.ru/index.php/ru/">Инструм-РЭНД</a></h2>*/}
                    <h2>{currentPage.title}</h2>
                  </div>
                }
                <div style={{margin: '0.5em'}}>
                    <Post index={parseInt(params.index)} fileName={''}/>
                </div>
            </div>

            <div className="document">
                <Posts index={parseInt(params.index)}/>
            </div>

        </div>
    )
}

export default Home