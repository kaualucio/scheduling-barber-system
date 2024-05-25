'use client'
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";

export interface ComboboxOption {
  value: string;
  label: React.ReactNode;
}

type ComboboxPropsSingle = {
  options: ComboboxOption[];
  emptyText?: string;
  clearable?: boolean;
  selectPlaceholder?: string;
  searchPlaceholder?: string;
  multiple?: false;
  value?: string;
  onValueChange?: (value: string) => void;
};

type ComboboxPropsMultiple = {
  options: ComboboxOption[];
  emptyText?: string;
  clearable?: boolean;
  selectPlaceholder?: string;
  searchPlaceholder?: string;
  multiple: true;
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

export type ComboboxProps = ComboboxPropsSingle | ComboboxPropsMultiple;

export const handleSingleSelect = (props: ComboboxPropsSingle, option: ComboboxOption) => {
  if (props.clearable) {
    props.onValueChange?.(option.value === props.value ? "" : option.value);
  } else {
    props.onValueChange?.(option.value);
  }
};

export const handleMultipleSelect = (props: ComboboxPropsMultiple, option: ComboboxOption) => {
  if (props.value?.includes(option.value)) {
    if (!props.clearable && props.value.length === 1) return false;
    props.onValueChange?.(props.value.filter((value) => value !== option.value));
  } else {
    props.onValueChange?.([...(props.value ?? []), option.value]);
  }
};

export const MultiSelect = forwardRef(
  (props: ComboboxProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [open, setOpen] = useState(false);
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            variant="outline"
            aria-expanded={open}
            className="w-full px-1 h-auto justify-between hover:bg-secondary/20 active:scale-100 relative"
          >
            <span className="line-clamp-1 text-left font-normal h-auto flex items-center gap-0.5 flex-wrap">
              {props.multiple && props.value && props.value.length === 1 && (
                <span className="mr-1">{props.options.find((option: any) => option.value === props.value![0])?.label}</span>
              )}

              {props.multiple && props.value && props.value.length > 1 && props.value.map(value => (
                <span key={value} className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs font-medium text-gray-800 mr-1">
                  {props.options.find((option: any) => option.value === value)?.label}
                </span>
              ))}

              {!props.multiple &&
                props.value &&
                props.value !== "" &&
                props.options.find((option) => option.value === props.value)?.label}

              {!props.value ||
                (props.value.length === 0 && (props.selectPlaceholder ?? <span className="text-muted-foreground px-2">Selecione um serviço...</span>))}
            </span>
            <ChevronDown
              className={cn(
                "absolute top-1/2 -translate-y-1/2 right-2 ml-2 h-4 w-4 shrink-0 rotate-0 opacity-50 transition-transform",
                open && "rotate-180",
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0 w-[330px]">
          <Command className="">
            <CommandInput
              ref={ref}
              placeholder={props.searchPlaceholder ?? "Pesquisar por serviços"}
            />
              <CommandEmpty>{props.emptyText ?? "Nenhum resultado encontrado"}</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <ScrollArea>
                  <div>
                    {props.options.map((option) => (
                      <CommandItem
                        className="data-[disabled='true']"
                        key={option.value}
                        value={option.value.toLowerCase().trim()}
                        onSelect={(selectedValue) => {
                          const option = props.options.find(
                            (option) => option.value.toLowerCase().trim() === selectedValue,
                          );
                          if (!option) return null;

                          if (props.multiple) {
                            handleMultipleSelect(props, option);
                          } else {
                            handleSingleSelect(props, option);

                            setOpen(false);
                          }
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4 opacity-0",
                            !props.multiple && props.value === option.value && "opacity-100",
                            props.multiple && props.value?.includes(option.value) && "opacity-100",
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </div>
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

MultiSelect.displayName = "MultiSelect";