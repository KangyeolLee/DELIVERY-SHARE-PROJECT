package com.graphql.deliveryShare2.sample.AboutChat;

import com.graphql.deliveryShare2.sample.AboutUser.UserRepository;
import com.graphql.deliveryShare2.sample.AboutUser.UserEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import graphql.schema.DataFetcher;

import java.util.List;

@Component
public class ChatDataFetcher {
    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public ChatDataFetcher(ChatRepository chatRepository, MessageRepository messageRepository, UserRepository userRepository) {
      this.chatRepository = chatRepository;
      this.messageRepository = messageRepository;
      this.userRepository = userRepository;
     }
  
    public DataFetcher<?> allChats () {
      return environment -> {
        return chatRepository.findAll();
      };
    }
  
    public DataFetcher<?> Chat () {
      return environment -> {
        int seq = environment.getArgument("seq");
        return chatRepository.findBySeq(seq);
      };
    }

    public List<MessageEntity> getMessage(ChatEntity chatEntity) {
      return messageRepository.findAll();
      

    }

  


    public MessageEntity getLastMessage(ChatEntity chatEntity) {
      return messageRepository.findBySeq(chatEntity.getLastMessage().getSeq());
    }

    public UserEntity getParticipants1(ChatEntity chatEntity) {
      return userRepository.findBySeq(chatEntity.getParticipants1().getSeq());
    }

    public UserEntity getParticipants2(ChatEntity chatEntity) {
      return userRepository.findBySeq(chatEntity.getParticipants2().getSeq());
    }

    public DataFetcher<?> quitChat(){
      return environment -> {
        int seq=environment.getArgument("seq");
      
        ChatEntity chat = chatRepository.findBySeq(seq);
        chat.setParticipant1Null();
        chat.setIsActive();

        chatRepository.save(chat);


        //chatRepository.deleteBySeq(seq);
        return true;
      };
    }

    public DataFetcher<?> createChat(){
      return environment -> {


        
        List<ChatEntity> chat = chatRepository.findAll();
       
        //int participant1seq = environment.getArgument("participant1seq");
        Integer participant2seq = environment.getArgument("participant2seq");
        //int last_message = environment.getArgument("last_message");

        for (int i=0; i<chat.size();i++){
          int a = chat.get(i).getParticipant2seq();
          if(a == participant2seq) {
            //return chat.get(i).getSeq();
            return chat.get(i);
          }
        }
        ChatEntity chatEntity = new ChatEntity();
        chatEntity.setParticipant1(10);
        chatEntity.setParticipant2(participant2seq);
        //chatEntity.setLastMessage(last_message);
        chatEntity.setIsActive1();
        chatEntity.setCreatedAt();

        chatRepository.save(chatEntity);

        return chatEntity;
      };
    }
  
}