export default class AsyncMutex {
	private callQueue: Promise<void>;
	private locked = false;

	acquire(callback: () => Promise<void>, id?: number): Promise<void> {
		const resolve = this.callQueue ? this.callQueue.then(() => this.executeWithLock(callback)) : this.executeWithLock(callback)
		console.log(resolve);
		this.callQueue = resolve;
		return resolve;
	}

	isLocked() {
		return this.locked;
	}

	private async executeWithLock(callback: () => Promise<void>): Promise<void> {
		this.locked = true;
		try {
			await callback()
		} catch (error) {
			return Promise.reject(error)
		} finally {
			this.locked = false;
		}
	}
}