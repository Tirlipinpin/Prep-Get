import json
from tkinter 		import *
from tkinter.ttk	import *
from urllib 		import request

packages = []
list_url = "http://127.0.0.1:4242/list"
req = request.Request(list_url)
try:
	response = request.urlopen(req).read().decode("utf8")
	packages = json.loads(response)
except IOError:
	print("Error while connecting to server")
	exit(1)

class Window():
	def __init__(self):
		# The window
		self.window = Tk()
		self.window.title("Prep-Get")
		self.window.minsize(width=750, height=500)
		self.window.maxsize(width=750, height=500)
		
		# Menu bar
		menubar = Menu(self.window)
		filemenu = Menu(menubar, tearoff=0);
		filemenu.add_command(label="Exit", command=self.close_window)
		menubar.add_cascade(label="File", menu=filemenu)
		self.window.config(menu=menubar)
		
		# Listbox packets
		listbox = Listbox(self.window)
		listbox.bind('<<ListboxSelect>>', self.list_on_select)
		listbox.grid(row=0, column=0, columnspan=2, padx=3, sticky=N+S+E+W)
		for obj in packages:
			listbox.insert(END, obj["name"])

		# Combobox version
		self.cur_version	= StringVar()
		self.list_version = Combobox(self.window, textvariable = self.cur_version, state = 'readonly')
		self.list_version.grid()

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
			for objs in packages:
				if objs["name"] == value:
					pack_version = objs["versions"]
					break
			self.list_version['values'] = pack_version
			if len(pack_version) > 0:
				self.list_version.set(pack_version[0])
	
		
if __name__ == "__main__":
	wnd = Window()
	
	
	
	
	
	
	
	
	
	
	
	
	
	