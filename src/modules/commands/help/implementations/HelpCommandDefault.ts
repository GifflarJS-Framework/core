class HelpCommandDefault {
  async execute(value: string): Promise<void> {
    console.log("Help");
  }
}
export default HelpCommandDefault;
