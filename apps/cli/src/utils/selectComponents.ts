// @ts-ignore
import { MultiSelect } from 'enquirer';
import { Component } from '../common/types';
/**
 * Provides a interactive prompt to select components
 * @param {any} components - list of components
 */
export async function selectComponents(components: Component[]): Promise<Component[]> {
  let selectedComponents: any = undefined;
  const prompt = new MultiSelect({
    name: 'value',
    message: 'Pick components to run',
    choices: components.map((component: any) => {
      return { name: component.name, value: component };
    }),
    result(names: string[]) {
      const componentsMap = this.map(names);
      const componentsList = Object.values(componentsMap);
      return componentsList;
    },
  });
  await prompt.run()
    .then((answer: Component[]) => selectedComponents = answer);
  return selectedComponents;
}
