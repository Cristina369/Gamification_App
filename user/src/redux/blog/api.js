import axiosI from "../axios";
import * as actions from "./index";

const Url = "http://localhost:8080/api";
const apiUrl = Url + "/quests";

export const acceptQuest = async (id, dispatch) => {
  dispatch(actions.acceptQuestStart());
  try {
    const { data } = await axiosI.put(Url + `/quests/accept/${id}`);
    dispatch(actions.acceptQuestSuccess(id));
    alert(data.message);
    return true;
  } catch (error) {
    dispatch(actions.acceptQuestFailure());
    return false;
  }
};
