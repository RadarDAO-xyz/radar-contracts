/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface IBeliefsInterface extends Interface {
  getFunction(
    nameOrSignature: "believeProject" | "removeBelief"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "EditionBeliefRemoved" | "EditionBelieved"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "believeProject",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeBelief",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "believeProject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeBelief",
    data: BytesLike
  ): Result;
}

export namespace EditionBeliefRemovedEvent {
  export type InputTuple = [editionId: BigNumberish, believer: AddressLike];
  export type OutputTuple = [editionId: bigint, believer: string];
  export interface OutputObject {
    editionId: bigint;
    believer: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace EditionBelievedEvent {
  export type InputTuple = [
    editionId: BigNumberish,
    believer: AddressLike,
    tags: string
  ];
  export type OutputTuple = [editionId: bigint, believer: string, tags: string];
  export interface OutputObject {
    editionId: bigint;
    believer: string;
    tags: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IBeliefs extends BaseContract {
  connect(runner?: ContractRunner | null): IBeliefs;
  waitForDeployment(): Promise<this>;

  interface: IBeliefsInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  believeProject: TypedContractMethod<
    [editionId: BigNumberish, tags: string],
    [void],
    "nonpayable"
  >;

  removeBelief: TypedContractMethod<
    [editionId: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "believeProject"
  ): TypedContractMethod<
    [editionId: BigNumberish, tags: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "removeBelief"
  ): TypedContractMethod<[editionId: BigNumberish], [void], "nonpayable">;

  getEvent(
    key: "EditionBeliefRemoved"
  ): TypedContractEvent<
    EditionBeliefRemovedEvent.InputTuple,
    EditionBeliefRemovedEvent.OutputTuple,
    EditionBeliefRemovedEvent.OutputObject
  >;
  getEvent(
    key: "EditionBelieved"
  ): TypedContractEvent<
    EditionBelievedEvent.InputTuple,
    EditionBelievedEvent.OutputTuple,
    EditionBelievedEvent.OutputObject
  >;

  filters: {
    "EditionBeliefRemoved(uint256,address)": TypedContractEvent<
      EditionBeliefRemovedEvent.InputTuple,
      EditionBeliefRemovedEvent.OutputTuple,
      EditionBeliefRemovedEvent.OutputObject
    >;
    EditionBeliefRemoved: TypedContractEvent<
      EditionBeliefRemovedEvent.InputTuple,
      EditionBeliefRemovedEvent.OutputTuple,
      EditionBeliefRemovedEvent.OutputObject
    >;

    "EditionBelieved(uint256,address,string)": TypedContractEvent<
      EditionBelievedEvent.InputTuple,
      EditionBelievedEvent.OutputTuple,
      EditionBelievedEvent.OutputObject
    >;
    EditionBelieved: TypedContractEvent<
      EditionBelievedEvent.InputTuple,
      EditionBelievedEvent.OutputTuple,
      EditionBelievedEvent.OutputObject
    >;
  };
}