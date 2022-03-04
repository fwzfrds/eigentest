import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, CardGroup, Button, Row, Col } from 'reactstrap';
import axios, { AxiosResponse } from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';
import { getRequest } from './axiosConfig';

type PostType = {
    author: string,
    content: string,
    description: string,
    publishedAt: string,
    source: PostSource,
    title: string,
    url: string,
    urlToImage: string
}

type PostSource = {
    id: string | null,
    name: string
}

const News: FC = (): ReactElement => {
    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        const getPosts = async () => {

            try {
                let res: AxiosResponse = await getRequest(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=`)

                if (res.status == 200) {
                    setPosts(res.data.articles);
                    console.log(res.data.articles);
                }
                setLoading(false);

                return res.data.articles;
            }
            catch (err) {
                console.error(err);
            }
        }

        getPosts();

    }, [])

    // console.log(posts);

    if (loading) {
        return <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    } else {
        return (
            <div className='container mt-4'>
                <h1>News App</h1>
                <Row className="container mt-3">
                    {posts.map(post => {
                        return (
                            <Col className='col-4' key={post.url}>
                                <Link
                                    to={`/news/${post.title},${post.description}`}
                                    className='link'
                                >
                                    <CardGroup>
                                        <Card className="card mt-3">
                                            <CardImg
                                                alt="Card image cap"
                                                src={post.urlToImage}
                                                className="cardImg"
                                            />
                                            <CardBody>
                                                <CardTitle
                                                    tag="h5"
                                                    className='cardTitle'
                                                >
                                                    {post.title}
                                                </CardTitle>
                                                <CardText
                                                    className='cardDesc'
                                                >
                                                    {post.description.slice(0, 120)}...
                                                </CardText>
                                                <CardText
                                                    className='cardAuthor'
                                                >
                                                    {post.author}
                                                </CardText>
                                                <CardText
                                                    className='cardDate'>
                                                    <small className="text-muted">
                                                        {post.publishedAt}
                                                    </small>
                                                </CardText>
                                            </CardBody>
                                        </Card>
                                    </CardGroup>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        );

    }
}

export default News