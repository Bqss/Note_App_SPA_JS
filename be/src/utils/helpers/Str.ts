export class Str{
  public static slugify(text: string): string {
    return text.toLowerCase().replace(/ /g, "-");
  }
}