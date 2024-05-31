import React from 'react'
import Loader from './Loader'
import Messages from './Messages'
import ConvoTopBar from './ConvoTopBar'
import { Box } from '@mui/material'
import EmojiPicker from 'emoji-picker-react'
import moment from 'moment'

const Conversation = ({currentChat, receiver, showChatMesssages, openEmojis, setText, text, user }) => {
  return (
    <Box
                sx={{
                  my: 8,
                  mx: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  maxHeight: "65vh",
                  minHeight: "65vh",
                  width: "100%",
                  paddingX: "10px",
                  // paddingRight: "3em",
                }}
              >
                {currentChat?.length > 0 && (
                  <ConvoTopBar
                    profilePic={receiver?.profilePhoto?.secure_url}
                    lastseen={
                      receiver?.Is_Online === "true"
                        ? "Online"
                        : moment(receiver?.lastseen).fromNow()
                    }
                    name={receiver?.name}
                    user={receiver}
                  />
                )}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column-reverse",
                    overflow: "scroll",
                    scrollBehavior: "smooth",
                    paddingInline: 10,
                  }}
                >
                  {
                   showChatMesssages && currentChat?.length < 1 ? (
                           <Loader />
                    ) : (
                      currentChat?.length > 0 ? (
                        currentChat?.map((message) =>
                          message?.type === "Text" ? (
                            <Messages key={message?._id} message={message} messageTime={message?.createdAt} />
                          ) : (
                            <p
                            key={message?._id}
                              style={{
                                backgroundColor:
                                  user?._id === message?.sender ? "gray" : "lightskyblue",
                                alignSelf:
                                  user?._id === message?.sender
                                    ? "flex-end"
                                    : "flex-start",
                                maxWidth: "40%",
                                padding: 10,
                                borderRadius: 10,
                                color: 'white'
                              }}
                            >
                              This is an Attachment
                            </p>
                          )
                        )
                      ) : (
                        <p
                          style={{ alignSelf: "center", justifyContent: "center" }}
                        >
                          Tap On A Conversation from the Coversations List on the
                          left To See Messages Here
                        </p>
                      )
                    )
                  }
                  {openEmojis && (
                    <EmojiPicker
                      style={{ position: "fixed", bottom: 100, width: '95%', backgroundColor: 'lightgray' }}
                      open={openEmojis}
                      onEmojiClick={(emoji) =>
                        setText(text.concat(emoji?.emoji))
                      }
                    />
                  )}
                </div>
              </Box>
  )
}

export default Conversation
