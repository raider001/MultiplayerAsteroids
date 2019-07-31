
import { Header } from '@/tslib/sockets/Header';

export type CloseInterface = (data: CloseEvent) => void;

export type MessageInterface = (data: Header) => void;

export type OpenInterface = (data: Event) => void;

export type ErrorInterface = (data: Event) => void;
