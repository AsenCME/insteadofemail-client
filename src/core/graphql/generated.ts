import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Mongo object id scalar type */
  ObjectId: any;
};

export type Query = {
  __typename?: 'Query';
  messenger?: Maybe<Messenger>;
  room?: Maybe<Room>;
  rooms: Room;
};


export type QueryMessengerArgs = {
  id: Scalars['ObjectId'];
};


export type QueryRoomArgs = {
  id: Scalars['ObjectId'];
};

export type Messenger = {
  __typename?: 'Messenger';
  _id: Scalars['ID'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  email: Scalars['String'];
  display_name: Scalars['String'];
  rooms: Array<Room>;
};

export type Room = {
  __typename?: 'Room';
  _id: Scalars['ID'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  name: Scalars['String'];
  createdBy: Messenger;
  participants: Array<Messenger>;
  messages: Array<Message>;
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  content: Scalars['String'];
  sender: Messenger;
  room: Room;
};


export type Mutation = {
  __typename?: 'Mutation';
  createMessage: Message;
  addUser: Messenger;
  makeRoom: Room;
};


export type MutationCreateMessageArgs = {
  room: Scalars['ObjectId'];
  sender: Scalars['ObjectId'];
  content: Scalars['String'];
};


export type MutationAddUserArgs = {
  display_name?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};


export type MutationMakeRoomArgs = {
  participants?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  createdBy: Scalars['ObjectId'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  room: Scalars['ObjectId'];
};

export type RoomQueryVariables = Exact<{
  id: Scalars['ObjectId'];
}>;


export type RoomQuery = (
  { __typename?: 'Query' }
  & { room?: Maybe<(
    { __typename?: 'Room' }
    & Pick<Room, 'name'>
    & { createdBy: (
      { __typename?: 'Messenger' }
      & Pick<Messenger, 'email'>
    ), messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'content' | 'createdAt'>
      & { sender: (
        { __typename?: 'Messenger' }
        & Pick<Messenger, 'email' | 'display_name'>
      ) }
    )> }
  )> }
);

export type MessageSubscriptionVariables = Exact<{
  room: Scalars['ObjectId'];
}>;


export type MessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'content' | 'createdAt'>
    & { sender: (
      { __typename?: 'Messenger' }
      & Pick<Messenger, 'email' | 'display_name'>
    ) }
  ) }
);


export const RoomDocument = gql`
    query Room($id: ObjectId!) {
  room(id: $id) {
    name
    createdBy {
      email
    }
    messages {
      content
      createdAt
      sender {
        email
        display_name
      }
    }
  }
}
    `;

/**
 * __useRoomQuery__
 *
 * To run a query within a React component, call `useRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRoomQuery(baseOptions?: Apollo.QueryHookOptions<RoomQuery, RoomQueryVariables>) {
        return Apollo.useQuery<RoomQuery, RoomQueryVariables>(RoomDocument, baseOptions);
      }
export function useRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomQuery, RoomQueryVariables>) {
          return Apollo.useLazyQuery<RoomQuery, RoomQueryVariables>(RoomDocument, baseOptions);
        }
export type RoomQueryHookResult = ReturnType<typeof useRoomQuery>;
export type RoomLazyQueryHookResult = ReturnType<typeof useRoomLazyQuery>;
export type RoomQueryResult = Apollo.QueryResult<RoomQuery, RoomQueryVariables>;
export const MessageDocument = gql`
    subscription Message($room: ObjectId!) {
  newMessage(room: $room) {
    content
    createdAt
    sender {
      email
      display_name
    }
  }
}
    `;

/**
 * __useMessageSubscription__
 *
 * To run a query within a React component, call `useMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSubscription({
 *   variables: {
 *      room: // value for 'room'
 *   },
 * });
 */
export function useMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MessageSubscription, MessageSubscriptionVariables>) {
        return Apollo.useSubscription<MessageSubscription, MessageSubscriptionVariables>(MessageDocument, baseOptions);
      }
export type MessageSubscriptionHookResult = ReturnType<typeof useMessageSubscription>;
export type MessageSubscriptionResult = Apollo.SubscriptionResult<MessageSubscription>;