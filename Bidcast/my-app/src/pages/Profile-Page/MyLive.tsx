import { Button, Card, Container, Image } from "react-bootstrap";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import {
    fetchMyLive,
    updateLiveStatus,
} from "../../redux/myLiveProducts/action";
import moment from "moment";
import "./Animation.scss";
import "./MyLive.scss";

export function MyLive() {
    const dispatch = useDispatch();

    const lives = useSelector((state: RootState) =>
        Object.values(state.myLive.myLive)
    );

    const user = useSelector((state: RootState) => state.authState.user);
    const userInfo = JSON.parse(JSON.stringify(user));

    useEffect(() => {
        dispatch(fetchMyLive());
    }, [dispatch]);

    const [liveId, setLiveId] = useState(0);

    useEffect(() => {
        dispatch(updateLiveStatus(liveId));
    }, [dispatch, liveId]);

    // const [disabled, setDisabled] = useState(false);

    return (
        <div className="myLive ps-3">
            <Container>
                <h2 className="pt-3">我的直播</h2>
            </Container>
            <Container className="my_live_container pt-3">
                <div className="row w-100">
                    {lives.map((live) =>
                        live.user_id === userInfo.id ? (
                            <div
                                className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3"
                                key={live.id}
                            >
                                <Card
                                    className="my_live_product_card_body w-100 h-100"
                                    style={{ width: "16rem" }}
                                >
                                    <div className="card_bg_color2">
                                        <div className="card_absolute_layer d-flex justify-content-center">
                                            <Image
                                                className="my_live_products"
                                                src={`${process.env.REACT_APP_BACKEND_URL}/${live.image}`}
                                                fluid
                                            />
                                        </div>
                                    </div>
                                    <Card.Body className="my_bid_card_container">
                                        <Card.Title>{live.title}</Card.Title>
                                        <Card.Text>
                                            {moment(live.starting_time).format(
                                                "YYYY-MM-DD hh:mm:ss"
                                            )}
                                        </Card.Text>

                                        {live.is_ended ? (
                                            <div>
                                                <Card.Text>
                                                    觀看人數： {live.max_viewer}
                                                </Card.Text>
                                                <Button
                                                    variant="outline-dark"
                                                    className="bid_button"
                                                    disabled
                                                >
                                                    直播完結
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="d-flex justify-content-around w-100">
                                                <Button
                                                    variant="outline-dark"
                                                    className="bid_button"
                                                    onClick={() => {
                                                        dispatch(
                                                            push(
                                                                `/liveStreamingSeller?token=${live.seller_link}`
                                                            )
                                                        );
                                                    }}
                                                >
                                                    開始直播
                                                </Button>
                                                <Button
                                                    variant="outline-dark"
                                                    className="bid_button"
                                                >
                                                    完成直播
                                                </Button>
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </div>
                        ) : (
                            " "
                        )
                    )}
                </div>

                <Card
                    className="my_live_product_card_body"
                    style={{ width: "16rem" }}
                >
                    <Image
                        className="my_live_products"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOKWyupCA7IZfNCTrogofaPnaClmqOly430g&usqp=CAU"
                        fluid
                    />
                    <Card.Body className="my_bid_card_container">
                        <Card.Title>Name</Card.Title>
                        <Card.Text>Live starting time</Card.Text>
                        <Card.Text>max viewers</Card.Text>
                        <Button
                            variant="outline-dark"
                            className="bid_button"
                            disabled
                        >
                            直播完結
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
