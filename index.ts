#!/usr/bin/env node
import AsyncMutex from "./AsyncMutex";

main()


async function main() {
	await test2();
}

async function test1() {
	const asyncMutex = new AsyncMutex();

	console.log("locked: ", asyncMutex.isLocked())
	await asyncMutex.acquire(async () => {
		console.log("1 start", new Date().getSeconds())
		await sleep(1000);
		console.log("1 stop", new Date().getSeconds())
	}, 1)
	console.log("locked: ", asyncMutex.isLocked())
	asyncMutex.acquire(async () => {
		console.log("2 start", new Date().getSeconds())
		await sleep(2000);
		console.log("2 stop", new Date().getSeconds())
	}, 2)
	console.log("locked: ", asyncMutex.isLocked())
	asyncMutex.acquire(async () => {
		console.log("3 start", new Date().getSeconds())
		await sleep(4000);
		console.log("3 stop", new Date().getSeconds())
	}, 3)
	console.log("locked: ", asyncMutex.isLocked())
	asyncMutex.acquire(async () => {
		console.log("4 start", new Date().getSeconds())
		await sleep(1000);
		console.log("4 stop", new Date().getSeconds())
	}, 4)
	console.log("locked: ", asyncMutex.isLocked())
	await sleep(7000)
	console.log("locked: ", asyncMutex.isLocked())
	await sleep(4000)
	console.log("locked: ", asyncMutex.isLocked())
}



async function test2() {
	const mutex = new AsyncMutex();

	try {
		await mutex.acquire(async () => {
			throw new Error("Yeet!");
		})
	} catch (error) {
		console.log(`Error: ${error}`)
	}
	console.log("NEW!")
}

async function sleep(duration: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, duration))
}