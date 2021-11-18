import React, {FC, useEffect, useState} from "react"
import Posts from "../components/posts/Posts";
import Post from "../components/posts/Post";
import Links from "../components/Links";
import {
    getBriefly,
    getDirectories,
    getDirTitles, getPages,
    selectConfig, selectCurDir, selectPages,
    selectTitles, setCurDir
} from "../components/posts/postsSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getTitle} from "../lib/getTitle";

import "./page.css";
import Navbar from "../components/Navbar";
import {useParams, withRouter} from "react-router-dom";
import {RouterProps} from "../App";

export interface CurrentPage{
    directory: string;
    linkName: string;
    title: string;
}

const Home: FC<RouterProps> = (props: RouterProps) => {
/*const Home: FC<RouterProps> = ({ match }: RouterProps) => {*/
/*const Home: FC = () => {*/
    const dispatch = useAppDispatch();
    let pages: any;
    //const cur_dir: string = useAppSelector(selectCurDir);
    const config: string[] = useAppSelector(selectConfig);
    const titles: string[] = useAppSelector(selectTitles);
    const [currentPage, setCurrentPage] =
        useState<CurrentPage>({directory: '', linkName: '', title:''});

    //const { params } = match;
    const params = props.match.params;
    console.log(params.page + params.index);

    useEffect(() => {
        getPageDir(params.page);
    }, [params.page])

    async function getPageDir(param_dir:string) {
        pages = await dispatch(getPages());
        let page: string = pages.payload.content;
        let dir: string[] = page.split('\r\n');
        //let cur_dir: string[] = dir[0].split(':');
        let cur_dir: string[] = [param_dir];
        await dispatch(setCurDir(cur_dir[0]));
        await getCategorisFileList(cur_dir[0]);
        await dispatch(getDirTitles(cur_dir[0]));
        await setCurrentPage({directory: cur_dir[0], linkName: cur_dir[1], title: cur_dir[2]});
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
                      {/*<h2>{props.match.params.title}</h2>*/}
                    <h2>{currentPage.title}</h2>
                  </div>
                }
                <div style={{margin: '0.5em'}}>
                    <Post indexStr={params.index}/>
                </div>
            </div>

            <div className="document">
                <Posts index={parseInt(params.index)}/>
            </div>

        </div>
    )
}

//export default withRouter(Home)
export default Home