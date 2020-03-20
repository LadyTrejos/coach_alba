import React, { useState } from "react";
import Cookies from "js-cookie";
import api from "../api";

import { Checkbox } from "antd";

export default function CheckVideo(props) {
  const { id, title } = props;
  const [checked, setChecked] = useState(props.checked);
  const [watched_videos, setWatchedVideos] = useState(props.watched_videos);

  function handleChange(e, id, title) {
    setChecked(!checked);
    const csrftoken = Cookies.get("csrftoken");
    let newWatchedVideos = [];

    if (!watched_videos.includes(id)) {
      newWatchedVideos = watched_videos.concat([id]);
      setWatchedVideos(newWatchedVideos);
    } else {
      newWatchedVideos = watched_videos.filter(id_video => id_video != id);
      setWatchedVideos(newWatchedVideos);
    }

    const programData = JSON.stringify({
      watched_videos: newWatchedVideos
    });

    api
      .patch(`/api/users/${props.auth.user.id}/`, programData, {
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken
        }
      })
      .then(res => console.log("res:", res))
      .catch(err => console.log("err: ", err));
  }

  return (
    <Checkbox onChange={e => handleChange(e, id, title)} checked={checked}>
      He visto el video
    </Checkbox>
  );
}
