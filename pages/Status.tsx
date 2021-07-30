import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

import { Icon, Button, ListItem, Avatar } from "react-native-elements";

import { getOrders, getPositionStatus } from "../utils/API/status";

import { useAuth } from "../utils/AuthStateApp";

// import {
//   SwipeableList,
//   SwipeableListItem,
// } from "@sandstreamdev/react-swipeable-list";

// import "@sandstreamdev/react-swipeable-list/dist/styles.css";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 22,
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// });

const Status: React.FC = () => {
  
  const [position, setPosition] = React.useState();

  const [expanded_list, setExpanded_list] = React.useState([false, false]);

  const {idToken} = useAuth();

  const setPositionStatus = (data) => {
    if(data.data){
        console.log(data.data)
        setPosition(data.data);
    }else{
        setPosition("No Position");
    }
  }

  const list = [
    {
      name: "Amy Farha",
      subtitle: "Vice President",
    },
    {
      name: "Chris Jackson",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "Vice Chairman",
    },
  ];

  React.useEffect(() => {
    getPositionStatus(setPositionStatus, idToken);
  }, [])

  return (
    <>
      {position && position.map((value, key) => {
          return <Text key={key}>{value.side} {value.price} {value.size}</Text>
      })}
      {list.map((value, key) => {
        return (
          <ListItem.Accordion
            key={key}
            content={
              <>
                {/* <Icon name="place" size={30} /> */}
                <ListItem.Content>
                  <ListItem.Title>List Accordion</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expanded_list[key]}
            onPress={() => {
              let tmp_list = expanded_list.slice(0, expanded_list.length);
              tmp_list[key] = !tmp_list[key];
              setExpanded_list(tmp_list);
            }}
          >
            {expanded_list[key] ? (
              list.map((l, i) => (
                <ListItem.Swipeable
                  key={i}
                  bottomDivider
                  rightContent={
                    <Button
                      title="Delete"
                      icon={{ name: "delete", color: "white" }}
                      buttonStyle={{ backgroundColor: "red" }}
                    />
                  }
                  rightStyle={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <Avatar title={l.name[0]} source={{ uri: l.avatar_url }} /> */}

                  <ListItem.Content>
                    <ListItem.Title>{l.name}</ListItem.Title>
                    <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem.Swipeable>
                //   <SwipeableList>
                //     <SwipeableListItem
                //       swipeLeft={{
                //         content: <div>Revealed content during swipe</div>,
                //         action: () => console.info("swipe action triggered"),
                //       }}
                //       swipeRight={{
                //         content: <div>Revealed content during swipe</div>,
                //         action: () => console.info("swipe action triggered"),
                //       }}
                //       onSwipeProgress={(progress) =>
                //         console.info(`Swipe progress: ${progress}%`)
                //       }
                //     >
                //       <div>Item name</div>
                //     </SwipeableListItem>
                //   </SwipeableList>
              ))
            ) : (
              <></>
            )}
          </ListItem.Accordion>
        );
      })}
    </>
  );
};

export default Status;
