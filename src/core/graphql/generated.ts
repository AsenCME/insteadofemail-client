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
  messages?: Maybe<Array<Message>>;
  user?: Maybe<User>;
  conversation?: Maybe<Conversation>;
  conversations: Array<Conversation>;
};


export type QueryMessagesArgs = {
  createdBefore?: Maybe<Scalars['Float']>;
  conversation: Scalars['ObjectId'];
};


export type QueryUserArgs = {
  id: Scalars['ObjectId'];
};


export type QueryConversationArgs = {
  id: Scalars['ObjectId'];
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  content: Scalars['String'];
  sender: User;
  conversation: Conversation;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  email: Scalars['String'];
  display_name?: Maybe<Scalars['String']>;
  conversations: Array<Conversation>;
};

export type Conversation = {
  __typename?: 'Conversation';
  _id: Scalars['ID'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  name: Scalars['String'];
  createdBy: User;
  participants: Array<User>;
  messages: Array<Message>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createMessage: Message;
  createUser: User;
  createConversation: Conversation;
  joinConversation: JoinConversation;
};


export type MutationCreateMessageArgs = {
  conversation: Scalars['ObjectId'];
  sender: Scalars['ObjectId'];
  content: Scalars['String'];
};


export type MutationCreateUserArgs = {
  display_name?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};


export type MutationCreateConversationArgs = {
  participants?: Maybe<Array<Scalars['String']>>;
  createdBy: Scalars['String'];
  name: Scalars['String'];
};


export type MutationJoinConversationArgs = {
  email: Scalars['String'];
  conversation: Scalars['ObjectId'];
};

export type JoinConversation = {
  __typename?: 'JoinConversation';
  user_id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  conversation: Scalars['ObjectId'];
};

export type CreateConversationMutationVariables = Exact<{
  name: Scalars['String'];
  createdBy: Scalars['String'];
}>;


export type CreateConversationMutation = (
  { __typename?: 'Mutation' }
  & { createConversation: (
    { __typename?: 'Conversation' }
    & Pick<Conversation, '_id'>
    & { createdBy: (
      { __typename?: 'User' }
      & Pick<User, '_id'>
    ) }
  ) }
);

export type CreateMessageMutationVariables = Exact<{
  content: Scalars['String'];
  sender: Scalars['ObjectId'];
  conversation: Scalars['ObjectId'];
}>;


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMessage: (
    { __typename?: 'Message' }
    & Pick<Message, '_id'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'display_name'>
    ) }
  ) }
);

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'email' | 'display_name' | 'createdAt' | 'updatedAt'>
  ) }
);

export type JoinConversationMutationVariables = Exact<{
  conversation: Scalars['ObjectId'];
  email: Scalars['String'];
}>;


export type JoinConversationMutation = (
  { __typename?: 'Mutation' }
  & { joinConversation: (
    { __typename?: 'JoinConversation' }
    & Pick<JoinConversation, 'user_id'>
  ) }
);

export type ConversationQueryVariables = Exact<{
  id: Scalars['ObjectId'];
}>;


export type ConversationQuery = (
  { __typename?: 'Query' }
  & { conversation?: Maybe<(
    { __typename?: 'Conversation' }
    & Pick<Conversation, '_id' | 'name' | 'createdAt'>
    & { participants: Array<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'email' | 'display_name'>
    )>, createdBy: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'email' | 'display_name'>
    ) }
  )> }
);

export type MessagesQueryVariables = Exact<{
  conversation: Scalars['ObjectId'];
  createdBefore?: Maybe<Scalars['Float']>;
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages?: Maybe<Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'content' | 'createdAt'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'display_name'>
    ) }
  )>> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['ObjectId'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email' | 'display_name'>
  )> }
);

export type MessageSubscriptionVariables = Exact<{
  conversation: Scalars['ObjectId'];
}>;


export type MessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'content' | 'createdAt'>
    & { sender: (
      { __typename?: 'User' }
      & Pick<User, 'email' | 'display_name'>
    ) }
  ) }
);


export const CreateConversationDocument = gql`
    mutation CreateConversation($name: String!, $createdBy: String!) {
  createConversation(name: $name, createdBy: $createdBy) {
    _id
    createdBy {
      _id
    }
  }
}
    `;
export type CreateConversationMutationFn = Apollo.MutationFunction<CreateConversationMutation, CreateConversationMutationVariables>;

/**
 * __useCreateConversationMutation__
 *
 * To run a mutation, you first call `useCreateConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConversationMutation, { data, loading, error }] = useCreateConversationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      createdBy: // value for 'createdBy'
 *   },
 * });
 */
export function useCreateConversationMutation(baseOptions?: Apollo.MutationHookOptions<CreateConversationMutation, CreateConversationMutationVariables>) {
        return Apollo.useMutation<CreateConversationMutation, CreateConversationMutationVariables>(CreateConversationDocument, baseOptions);
      }
export type CreateConversationMutationHookResult = ReturnType<typeof useCreateConversationMutation>;
export type CreateConversationMutationResult = Apollo.MutationResult<CreateConversationMutation>;
export type CreateConversationMutationOptions = Apollo.BaseMutationOptions<CreateConversationMutation, CreateConversationMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($content: String!, $sender: ObjectId!, $conversation: ObjectId!) {
  createMessage(conversation: $conversation, sender: $sender, content: $content) {
    _id
    sender {
      email
      display_name
    }
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      content: // value for 'content'
 *      sender: // value for 'sender'
 *      conversation: // value for 'conversation'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, baseOptions);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $name: String) {
  createUser(email: $email, display_name: $name) {
    email
    display_name
    createdAt
    updatedAt
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const JoinConversationDocument = gql`
    mutation JoinConversation($conversation: ObjectId!, $email: String!) {
  joinConversation(email: $email, conversation: $conversation) {
    user_id
  }
}
    `;
export type JoinConversationMutationFn = Apollo.MutationFunction<JoinConversationMutation, JoinConversationMutationVariables>;

/**
 * __useJoinConversationMutation__
 *
 * To run a mutation, you first call `useJoinConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinConversationMutation, { data, loading, error }] = useJoinConversationMutation({
 *   variables: {
 *      conversation: // value for 'conversation'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useJoinConversationMutation(baseOptions?: Apollo.MutationHookOptions<JoinConversationMutation, JoinConversationMutationVariables>) {
        return Apollo.useMutation<JoinConversationMutation, JoinConversationMutationVariables>(JoinConversationDocument, baseOptions);
      }
export type JoinConversationMutationHookResult = ReturnType<typeof useJoinConversationMutation>;
export type JoinConversationMutationResult = Apollo.MutationResult<JoinConversationMutation>;
export type JoinConversationMutationOptions = Apollo.BaseMutationOptions<JoinConversationMutation, JoinConversationMutationVariables>;
export const ConversationDocument = gql`
    query Conversation($id: ObjectId!) {
  conversation(id: $id) {
    _id
    name
    createdAt
    participants {
      _id
      email
      display_name
    }
    createdBy {
      _id
      email
      display_name
    }
  }
}
    `;

/**
 * __useConversationQuery__
 *
 * To run a query within a React component, call `useConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useConversationQuery(baseOptions?: Apollo.QueryHookOptions<ConversationQuery, ConversationQueryVariables>) {
        return Apollo.useQuery<ConversationQuery, ConversationQueryVariables>(ConversationDocument, baseOptions);
      }
export function useConversationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConversationQuery, ConversationQueryVariables>) {
          return Apollo.useLazyQuery<ConversationQuery, ConversationQueryVariables>(ConversationDocument, baseOptions);
        }
export type ConversationQueryHookResult = ReturnType<typeof useConversationQuery>;
export type ConversationLazyQueryHookResult = ReturnType<typeof useConversationLazyQuery>;
export type ConversationQueryResult = Apollo.QueryResult<ConversationQuery, ConversationQueryVariables>;
export const MessagesDocument = gql`
    query Messages($conversation: ObjectId!, $createdBefore: Float) {
  messages(conversation: $conversation, createdBefore: $createdBefore) {
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
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      conversation: // value for 'conversation'
 *      createdBefore: // value for 'createdBefore'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions?: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const UserDocument = gql`
    query User($id: ObjectId!) {
  user(id: $id) {
    _id
    email
    display_name
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const MessageDocument = gql`
    subscription Message($conversation: ObjectId!) {
  newMessage(conversation: $conversation) {
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
 *      conversation: // value for 'conversation'
 *   },
 * });
 */
export function useMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MessageSubscription, MessageSubscriptionVariables>) {
        return Apollo.useSubscription<MessageSubscription, MessageSubscriptionVariables>(MessageDocument, baseOptions);
      }
export type MessageSubscriptionHookResult = ReturnType<typeof useMessageSubscription>;
export type MessageSubscriptionResult = Apollo.SubscriptionResult<MessageSubscription>;