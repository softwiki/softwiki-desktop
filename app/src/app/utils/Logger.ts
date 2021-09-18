export class Logger {
	public static debug(message: string): void {
		if (process.env.NODE_ENV !== "development")
			return ;
		console.log(`\x1b[36m[Softwiki] ${message}`);
	}

	public static error(message: string): void {
		console.log(`\x1b[31m[Softwiki] ${message}`);
	}

	public static success(message: string): void {
		console.log(`\x1b[32m[Softwiki] ${message}`);
	}

	public static info(message: string): void {
		console.log(`\x1b[0m[Softwiki] ${message}`);
	}
}