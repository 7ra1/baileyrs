/**
 * Local ambient declarations for the parts of `libsignal` we exercise in
 * unit tests. Upstream package ships JS only — these match the runtime
 * surface declared in `libsignal/src/session_record.js`. Narrow on purpose:
 * if a test needs more, extend here rather than reaching for `as any`.
 */

declare module 'libsignal/src/session_record.js' {
	import type { Buffer } from 'node:buffer'

	export interface SessionEntryChainKey {
		counter: number
		key: Buffer
	}

	export interface SessionEntryChain {
		chainKey: SessionEntryChainKey
		chainType: number
		messageKeys: Record<string, Buffer>
	}

	export interface SessionEntryRatchet {
		ephemeralKeyPair: { pubKey: Buffer; privKey: Buffer }
		lastRemoteEphemeralKey: Buffer
		previousCounter: number
		rootKey: Buffer
	}

	export interface SessionEntryIndexInfo {
		baseKey: Buffer
		baseKeyType: number
		closed: number
		used: number
		created: number
		remoteIdentityKey: Buffer
	}

	export interface SessionEntry {
		registrationId: number
		currentRatchet: SessionEntryRatchet
		indexInfo: SessionEntryIndexInfo
		_chains: Record<string, SessionEntryChain>
		pendingPreKey?: { preKeyId?: number; signedKeyId?: number; baseKey: Buffer }
	}

	export default class SessionRecord {
		static deserialize(data: unknown): SessionRecord
		haveOpenSession(): boolean
		getOpenSession(): SessionEntry | undefined
		closeSession(session: SessionEntry): void
		openSession(session: SessionEntry): void
		isClosed(session: SessionEntry): boolean
		removeOldSessions(): void
		deleteAllSessions(): void
	}
}
