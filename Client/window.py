import json
import functions as funcs
import tkinter.filedialog as fdialog
from tkinter 		import *
from tkinter.ttk	import *
from urllib 		import request


class Window():
	def __init__(self, host_url):
		self.init(host_url)

		# The window
		self.window = Tk()
		self.window.title("Prep-Get")
		self.window.minsize(width=750, height=500)
		self.window.maxsize(width=750, height=500)
		
		# Tab menu
		tab_menu = Notebook(self.window)
		tab_page1 = Frame(tab_menu)
		tab_page2 = Frame(tab_menu)
		tab_menu.add(tab_page1, text="Install")
		tab_menu.add(tab_page2, text="Upload")
		tab_menu.pack(expand=1, fill="both")

		# Menu bar
		menubar = Menu(self.window)
		filemenu = Menu(menubar, tearoff=0);
		filemenu.add_command(label="Exit", command=self.close_window)
		menubar.add_cascade(label="File", menu=filemenu)
		self.window.config(menu=menubar)
		
		# Listbox packets
		self.listbox = Listbox(tab_page1)
		self.listbox.bind('<<ListboxSelect>>', self.list_on_select)
		self.listbox.grid(row=0, column=0, columnspan=2, padx=3, sticky=N+S+E+W)
		for obj in self.packages:
			self.listbox.insert(END, obj["name"])

		# Combobox version
		self.cur_package = "";
		self.cur_version = StringVar()
		self.list_version = Combobox(tab_page1, textvariable=self.cur_version, state = 'readonly')
		self.list_version.grid(row=1, column=3)

		## Download button
		dl_button = Button(tab_page1, text="Download", command=self.dl_button_click)
		dl_button.grid(row=3, column=3)
		
		
		# Inputs upload
		self.username = StringVar()
		self.password = StringVar()
		label_username = Label(tab_page2, text="Username :")
		label_password = Label(tab_page2, text="Password :")
		input_username = Entry(tab_page2, textvariable=self.username)
		input_password = Entry(tab_page2, textvariable=self.password, show="*")
		label_username.grid()
		input_username.grid()
		label_password.grid()
		input_password.grid()
		
		# File to upload
		self.load_pack = ""
		button_load_pack = Button(tab_page2, text="Charger un paquet", command=self.button_load_pack_click)
		button_upload_pack = Button(tab_page2, text="Upload", command=self.button_upload_pack_click)
		button_load_pack.grid()
		button_upload_pack.grid()
		
		# Main loop
		self.window.mainloop()

	def close_window(self):
		self.window.destroy()

	def list_on_select(self, evt):
		w = evt.widget
		if len(w.curselection()) > 0:
			index = int(w.curselection()[0])
			value = w.get(index)
			pack_version = [ ]
			for objs in self.packages:
				if objs["name"] == value:
					pack_version = objs["versions"]
					break
			self.list_version['values'] = pack_version
			if len(pack_version) > 0:
				self.list_version.set(pack_version[0])
				self.cur_version.set(pack_version[0])
			self.cur_package = value
	
	def dl_button_click(self):
		if len(self.cur_package) > 0 and len(self.cur_version.get()) > 0:
			package = self.cur_package + "=" + self.cur_version.get()
			funcs.install_func([package])

	def button_load_pack_click(self):
		self.load_pack = fdialog.askopenfilename(title="Charger un packet", 
			filetypes=[('package file','.tar.gz'),])

	def button_upload_pack_click(self):
		funcs.upload_func([self.password.get(), self.username.get(), self.load_pack])

	def init(self, host):
		self.packages = []
		list_url = "/list"
		req = request.Request(host + list_url)
		try:
			response = request.urlopen(req).read().decode("utf8")
			self.packages = json.loads(response)
		except IOError:
			print("Error while connecting to server")
			exit(1)


if __name__ == "__main__":
	wnd = Window("http://138.68.174.191")
