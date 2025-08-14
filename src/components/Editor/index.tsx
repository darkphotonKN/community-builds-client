import { Color } from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Editor,
  Extension,
  mergeAttributes,
  Node,
  RawCommands,
} from '@tiptap/core';
import { Plugin, PluginKey, TextSelection } from 'prosemirror-state';
import { DOMParser } from '@tiptap/pm/model';
import EditorImage from '@tiptap/extension-image';
import { getRequest } from '@/lib/api/requestHelpers';
import Image from 'next/image';

const MenuBar = ({ allData }: { allData: any }) => {
  const { editor } = useCurrentEditor();
  // console.log('editor', editor?.getHTML());
  // if (!editor) {
  //   return null;
  // }

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    } catch (e: any) {
      alert(e.message);
    }
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('URL');

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  function elementFromString(value: string) {
    const element = document.createElement('div');
    element.innerHTML = value.trim();

    return element;
  }

  function insertHTML({ state, view }: Editor, value: string) {
    const { selection } = state;
    console.log('selection', selection);
    const element = elementFromString(value);
    console.log('element', element);
    const slice = DOMParser.fromSchema(state.schema).parseSlice(element);
    console.log('slice.content', slice.content);
    const transaction = state.tr.insert(selection.anchor, slice.content);
    console.log('transaction', transaction);

    // view.dispatch(transaction);
    editor?.commands.insertContentAt(selection.anchor, value);
  }

  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const handleOpenDataPanel = () => {
    setIsPanelOpen(true);
  };

  const handleSelectData = (id: string) => {
    if (!id) return;

    const target: any = allData.find((item: any) => item.id === id);
    console.log('target', target);
    if (editor) {
      insertHTML(
        editor,
        `<span><img src="${target.imageUrl}" alt="tt" />${target.name}</span>`
      );
      setIsPanelOpen(false);
    }
  };

  if (!editor) {
    return null;
  }
  console.log('isPanelOpen', isPanelOpen);
  return (
    <div className="control-group">
      <div className="tiptap-button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          Code
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          Paragraph
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
          }
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
          }
        >
          H4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
          }
        >
          H5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive('heading', { level: 6 }) ? 'is-active' : ''
          }
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          Blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={
            editor.isActive('textStyle', { color: '#958DF1' })
              ? 'is-active'
              : ''
          }
        >
          Purple
        </button>
        <button
          onClick={setLink}
          className={editor.isActive('link') ? 'is-active' : ''}
        >
          Set link
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
        >
          Unset link
        </button>
        <div className="inline-flex relative">
          <button className="" onClick={handleOpenDataPanel}>
            Add Game Data
          </button>
          <div
            className={`absolute top-0 z-10 w-[300px] h-[300px] p-[20px] bg-[#000]  text-[#fff] overflow-scroll border border-customSecondary ${
              isPanelOpen ? 'block' : 'hidden'
            }`}
          >
            <div className="">
              {allData.slice(0, 20).map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectData(item.id)}
                  className="flex gap-4 items-center py-[4px] hover:bg-customSecondary"
                >
                  <Image
                    src={item.imageUrl}
                    alt="1"
                    width="20"
                    height="20"
                    className="object-cover"
                  />
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button onClick={addImage}>Set image</button>
      </div>
    </div>
  );
};

const HoverExtension = Extension.create({
  name: 'hover',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('hover'),
        props: {
          handleDOMEvents: {
            mouseover(view, event: any) {
              console.log('view', view);
              console.log('event', event.target);
              // do whatever you want
              if (event.target?.classList.contains('game-item')) {
                const div = document.createElement('div');
                div.classList.add('panel');
                // todo get api data by item id
                div.innerHTML = 'hover text';
                console.log('div', div);
                document.body.appendChild(div);

                Object.assign(div.style, {
                  position: 'absolute',
                  top: `${event.clientY + 10}px`,
                  left: `${event.clientX + 10}px`,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  color: '#fff',
                  padding: '5px',
                  borderRadius: '5px',
                  zIndex: '1000',
                });

                event.target.addEventListener(
                  'mouseleave',
                  () => {
                    div.remove();
                  },
                  { once: true }
                );
              }
            },
          },
        },
      }),
    ];
  },
});

const PreventCursorInsideGroupExtension = Extension.create({
  name: 'preventCursorInsideGroup',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('preventCursorInsideGroup'),
        props: {
          handleClick: (view, pos) => {
            console.log('click view', view);
            console.log('click pos', pos);
            const { doc, tr } = view.state;
            console.log('click doc', doc);
            console.log('click tr', tr);
            const $pos = doc.resolve(pos);
            console.log('click $pos', $pos);

            // 檢查點擊位置是否在 span 節點內部
            const node = $pos.parent;
            console.log('click parent node', node);
            const index = $pos.index();
            console.log('click tag name', node.maybeChild(index)?.type.name);
            if (node.maybeChild(index)?.type.name === 'image') {
              // 如果是在 span 節點內，將光標移動到節點外部
              const nodePos = $pos.before(3);
              console.log('nodePos', nodePos);
              const $nodePos = doc.resolve(nodePos);
              const transaction = tr.setSelection(
                TextSelection.create(doc, $nodePos.pos)
              );

              view.dispatch(transaction);
              return true; // 阻止默認處理
            }

            return false; // 允許默認處理
          },
        },
      }),
    ];
  },
});

const ImageTextSpan = Node.create({
  name: 'span',
  group: 'inline',
  inline: true,
  atom: true,
  content: 'inline*',
  selectable: true,
  draggable: false,
  isolating: true,
  addAttributes() {
    return {
      class: {
        default: null,
      },
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (element: any) => {
          // const img = element.querySelector('img');
          return {
            class: 'game-item-group',
            // src: img?.getAttribute('src') || null,
            // alt: img?.getAttribute('alt') || null,
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const attrs = mergeAttributes(HTMLAttributes);

    // 返回一個包含 img 和内容位置標記(0)的結構
    return [
      'span',
      attrs,
      ['span', { class: 'game-item' }, 0], // 增加一個內部 span 來包含文字內容
    ];
  },

  addCommands() {
    return {
      insertGroupText:
        (text: string) =>
        ({ tr, dispatch }: { tr: any; dispatch: any }) => {
          const node = this.type.create({ text });
          tr.replaceSelectionWith(node);
          if (dispatch) dispatch(tr);
          return true;
        },
    } as Partial<RawCommands>;
  },
});

const KeyboardMovementExtension = Extension.create({
  name: 'keyboardMovement',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('keyboardMovement'),
        props: {
          handleKeyDown(view, event) {
            // 監聽左右箭頭鍵
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              const { state } = view;
              const { selection } = state;

              console.log('當前光標位置:', selection.from);
              console.log('按下了:', event.key);

              const { from } = selection;

              // 解析當前位置
              const $pos = state.doc.resolve(from);

              // 獲取當前節點
              const currentNode = $pos.node();
              console.log('當前節點類型:', currentNode.type.name);
              // 這裡可以加入你的自定義邏輯
              // 例如，檢查下一個位置是否在你的群組內
              // 構建路徑
              const path = [];
              for (let i = $pos.depth; i >= 0; i--) {
                path.push($pos.node(i).type.name);
              }
              console.log('path', path);
              // 檢查是否在 span 標籤內
              const isInSpan = path.includes('span');
              console.log('isInSpan', isInSpan);
              // 如果返回 true，ProseMirror 不會處理這個按鍵事件
              // 如果返回 false，ProseMirror 會繼續正常處理這個事件
              return false;
            }

            return false;
          },
        },
      }),
    ];
  },
});

const CustomParagraph = Node.create({
  name: 'paragraph',

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [{ tag: 'p' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(HTMLAttributes), ['span', 0]];
  },
});
const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // TextStyle.configure({ types: [ListItem.name] }),
  TextStyle.configure(),
  CustomParagraph.configure(),
  EditorImage.configure({
    inline: true,
    allowBase64: true,
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: 'https',
    protocols: ['http', 'https'],
    isAllowedUri: (url, ctx) => {
      try {
        // construct URL
        const parsedUrl = url.includes(':')
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`);

        // use default validation
        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false;
        }

        // disallowed protocols
        const disallowedProtocols = ['ftp', 'file', 'mailto'];
        const protocol = parsedUrl.protocol.replace(':', '');

        if (disallowedProtocols.includes(protocol)) {
          return false;
        }

        // only allow protocols specified in ctx.protocols
        const allowedProtocols = ctx.protocols.map((p) =>
          typeof p === 'string' ? p : p.scheme
        );

        if (!allowedProtocols.includes(protocol)) {
          return false;
        }

        // disallowed domains
        const disallowedDomains = [
          'example-phishing.com',
          'malicious-site.net',
        ];
        const domain = parsedUrl.hostname;

        if (disallowedDomains.includes(domain)) {
          return false;
        }

        // all checks have passed
        return true;
      } catch {
        return false;
      }
    },
    shouldAutoLink: (url: string) => {
      try {
        // construct URL
        const parsedUrl = url.includes(':')
          ? new URL(url)
          : new URL(`https://${url}`);

        // only auto-link if the domain is not in the disallowed list
        const disallowedDomains = [
          'example-no-autolink.com',
          'another-no-autolink.com',
        ];
        const domain = parsedUrl.hostname;

        return !disallowedDomains.includes(domain);
      } catch {
        return false;
      }
    },
  }),
  HoverExtension.configure({
    mouseover: (view: any, event: any) => {
      console.log('view', view);
      console.log('event', event.target.tagName);
    },
  }),
  // Span.configure(),
  ImageTextSpan.configure(),
  PreventCursorInsideGroupExtension.configure(),
  // CustomNodeExtension.configure(),
  KeyboardMovementExtension.configure(),
];

const content = ``;

const CustomEditor = ({
  handleChangeEditor,
  allData,
}: {
  handleChangeEditor: (content: string) => void;
  allData: any[];
}) => {
  return (
    <EditorProvider
      slotBefore={<MenuBar allData={allData} />}
      extensions={extensions}
      content={content}
      editorProps={{
        attributes: {
          style: 'min-height: 300px; border: 1px solid #ccc; padding: 10px;',
        },
      }}
      onUpdate={({ editor }) => {
        console.log('編輯後的 HTML:', editor.getHTML());
        console.log('編輯後的 JSON:', editor.getJSON());
        handleChangeEditor(editor.getHTML());
      }}
    ></EditorProvider>
  );
};
export default CustomEditor;
